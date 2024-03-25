use std::{io::{BufRead, BufReader}, ops::{Deref, DerefMut}, path::PathBuf, process::{Child, Command, Stdio}, sync::{Arc, Mutex}, thread::{self, Thread}};

use crate::{scipts::{barkov, coverage, serder}, types::{BarkovSettings, PreCheckAccount, Upload, VkSettings, MAX_FILE_SIZE}};
use actix::{spawn, Actor, StreamHandler};
use actix_multipart::form::MultipartForm;
use actix_web::{get, post, web, App, Error, HttpRequest, HttpResponse, HttpServer, Responder};
use actix_web_actors::ws;
use log::info;

struct WebSocketActor {
    command_sender: Arc<Mutex<Option<std::process::Child>>>,
}

impl Actor for WebSocketActor {
    type Context = ws::WebsocketContext<Self>;
}

// Message handling
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for WebSocketActor {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Text(command)) => {
                if command.starts_with("start") {
                    let mut sender_lock = self.command_sender.lock().unwrap();
                    match sender_lock.deref_mut() {
                        Some(_) => {
                            ctx.text("cant_start");
                        },
                        None => {
                            // Extract command to run
                            println!("Received command to run: {}", command);
                            // Execute command
                            let child = Command::new("python")
                                .arg("main.py")
                                .current_dir(PathBuf::from("./scripts/VK2/"))
                                .stdin(Stdio::null())
                                // .stdout(Stdio::piped())
                                .stderr(Stdio::piped())
                                .spawn();

                            match child {
                                Ok(child) => {
                                    // Store child process for potential later interaction
                                    *sender_lock = Some(child);
                                    ctx.text("started");
                                }
                                Err(err) => {
                                    info!("Running script error: {}", err);
                                    ctx.text("cant_start");
                                }
                            };
                        }
                    };
                } else if command == "stop" {
                    // Terminate process if exists
                    let mut sender = self.command_sender.lock().unwrap();
                    if let Some(mut child) = sender.take() {
                        let _ = child.kill();
                        ctx.text("stopped");
                    } else {
                        ctx.text("cant_stop");
                    }
                } else if command == "status" {
                    // Check command status
                    let status_message = {
                        let mut child_option = self.command_sender.lock().unwrap();
                        if let Some(child) = child_option.deref_mut() {
                            match child.try_wait() {
                                Ok(status_opt) => {
                                    match status_opt {
                                        Some(status) => {
                                            info!("{:?}", status);
                                            "inactive"
                                        },
                                        None => "active",
                                    }
                                },
                                Err(_) => "inactive",
                            }
                        } else {
                            "inactive"
                        }
                    };
                    ctx.text(status_message);
                } else if command == "close" {
                    let mut sender = self.command_sender.lock().unwrap();
                    if let Some(mut child) = sender.take() {
                        let _ = child.kill();
                        ctx.text("stopped");
                    } else {
                        ctx.text("cant_stop");
                    }
                    ctx.close(None)
                }else {
                    ctx.text("Invalid command format.");
                }
            }
            Ok(_) => (),
            Err(_) => ctx.close(None),
        }
    }

    fn finished(&mut self, ctx: &mut Self::Context) {
        info!("Finishing WS...");
        ctx.close(None);
        let mut sender = self.command_sender.lock().unwrap();
        if let Some(mut child) = sender.take() {
            let _ = child.kill();
            ctx.text("stopped");
        } else {
            ctx.text("cant_stop");
        };
        info!("WS is finished");
    }
}

#[get("/run")]
async fn start_sender(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let resp = ws::start(WebSocketActor {
        command_sender: Arc::new(Mutex::new(None)),
    }, &req, stream);
    println!("{:?}", resp);
    resp
}

#[post("/order")]
async fn upload_order(form: MultipartForm<Upload>) -> impl Responder {
    match serder::order(form.0) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(err) => {
            info!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[post("/input")]
async fn upload_input(form: MultipartForm<Upload>) -> impl Responder {
    match serder::input(form.0) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(err) => {
            info!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[post("/comments")]
async fn upload_comments(form: MultipartForm<Upload>) -> impl Responder {
    match serder::comments(form.0) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(err) => {
            info!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[post("/settings")]
async fn upload_settings(data: web::Json<VkSettings>) -> impl Responder {
    match serder::settings(data.0) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(err) => {
            info!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}
