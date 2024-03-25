use std::{fs::{read_to_string, File}, io::{BufRead, BufReader}, ops::Deref, path::PathBuf, sync::Mutex};

use actix_files::NamedFile;
use actix_multipart::{form::MultipartForm, Multipart};
use actix_web::{delete, get, middleware::Logger, post, put, web::{self, Data}, App, HttpResponse, HttpServer, Responder};
use log::info;
use crate::scipts::check;
use crate::types::{Account, Accounts, AppState, Upload};

use crate::{scipts::{barkov, coverage}, types::{BarkovSettings, PreCheckAccount, MAX_FILE_SIZE}};

#[delete("/coverages/{coverage}")]
async fn delete_coverage(path: web::Path<(String,)>) -> impl Responder {
    match coverage::remove(path.into_inner().0) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::BadRequest().finish()
    }
}

#[post("/coverage")]
async fn add_coverage(form: MultipartForm<Upload>) -> impl Responder {
    match coverage::add_file(form.0) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(err) => {
            info!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[post("/coverages")]
async fn check_coverage(form: MultipartForm<Upload>) -> impl Responder {
    match coverage::run(form.0) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(err) => {
            info!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}


#[get("/coverages")]
async fn get_coverages() -> impl Responder {
    match coverage::get_files() {
        Ok(coverages) => HttpResponse::Ok().json(coverages),
        Err(err) => {
            info!("{}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("/coverage-last")]
async fn last_coverage() -> actix_web::Result<NamedFile> {
    Ok(NamedFile::open("scripts\\Охваты\\output.csv")?)
}