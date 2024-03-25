use actix_multipart::form::MultipartForm;
use actix_web::{post, HttpResponse, Responder};

use crate::{scipts::check, types::Upload};

#[post("/check")]
async fn check_accounts(form: MultipartForm<Upload>) -> impl Responder {
    let inner = form.into_inner();
    let file = inner.file.file.path();

    match check::run(file) {
        Ok(accounts) => HttpResponse::Ok().json(accounts),
        Err(err) => {
            println!("{:?}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}