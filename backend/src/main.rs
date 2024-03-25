use std::path::PathBuf;

use actix_web::{delete, get, middleware::Logger, post, put, web::{self, Data}, App, HttpResponse, HttpServer, Responder};
use log::info;
use routes::{barkov::{add_post, delete_post, get_posts}, check::check_accounts, coverage::{add_coverage, check_coverage, delete_coverage, get_coverages, last_coverage}, serder::{start_sender, upload_comments, upload_input, upload_order, upload_settings}};

mod types;
mod scipts;
mod routes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // access logs are printed with the INFO level so ensure it is enabled by default
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    HttpServer::new(|| {
        App::new()
        .wrap(Logger::default())
        .service(
            web::scope("/api")
                .service(check_accounts)
                .service(get_posts)
                .service(get_coverages)
                .service(delete_post)
                .service(delete_coverage)
                .service(add_post)
                .service(add_coverage)
                .service(last_coverage)
                .service(check_coverage)
                .service(
                    web::scope("/sender")
                        .service(start_sender)   
                        .service(upload_order)
                        .service(upload_input)
                        .service(upload_comments)
                        .service(upload_settings)
                )
                .service(
                    web::scope("/static")
                        .service(
                            actix_files::Files::new(
                                "/posts",
                                PathBuf::from("scripts\\barkov111\\Готовые файлы\\")
                            ).show_files_listing()
                        )
                        .service(
                            actix_files::Files::new(
                                "/coverages",
                                PathBuf::from("scripts\\Охваты\\Готовые файлы\\")
                            ).show_files_listing()
                        )
                )
        )
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}