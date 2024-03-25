use std::{fs::{read_to_string, File}, io::{BufRead, BufReader}, ops::Deref, path::PathBuf, sync::Mutex};

use actix_files::NamedFile;
use actix_multipart::{form::MultipartForm, Multipart};
use actix_web::{delete, get, middleware::Logger, post, put, web::{self, Data}, App, HttpResponse, HttpServer, Responder};
use log::info;
use crate::scipts::check;
use crate::types::{Account, Accounts, AppState, Upload};

use crate::{scipts::{barkov, coverage}, types::{BarkovSettings, PreCheckAccount, MAX_FILE_SIZE}};

#[post("/post")]
async fn add_post(form: MultipartForm<BarkovSettings>) -> impl Responder {
    match barkov::add_post(form.into_inner()) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(err) => {
            info!("{:?}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("/posts")]
async fn get_posts() -> impl Responder {
    match barkov::get_posts() {
        Ok(posts) => HttpResponse::Ok().json(posts),
        Err(err) => {
            info!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[delete("/posts/{post}")]
async fn delete_post(path: web::Path<(String,)>) -> impl Responder {
    match barkov::remove_post(path.into_inner().0) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::BadRequest().finish()
    }
}
