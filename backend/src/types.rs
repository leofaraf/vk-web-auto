use std::sync::Mutex;

use actix_multipart::form::{tempfile::TempFile, text::Text, MultipartForm};
use serde::{Deserialize, Serialize};

pub type Accounts = Vec<Account>;
pub type Res<T> = Result<T, Box<dyn std::error::Error>>;
pub const MAX_FILE_SIZE: u64 = 1024 * 1024 * 10; // 10 MB
pub const MAX_FILE_COUNT: i32 = 1;

pub struct AppState {
    pub accounts: Mutex<Vec<Account>>
}

pub struct PreCheckAccount {
    pub phone_number: String,
    pub password: String
}

#[derive(Debug, Deserialize)]
pub struct CheckEntry {
    pub phone_number: String,
    pub token: String,
    pub status: bool
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Account {
    pub phone_number: String,
    pub token: String,
    pub status: bool
}

#[derive(MultipartForm)]
pub struct BarkovSettings {
    pub settings: TempFile,
    pub request: TempFile
}

#[derive(MultipartForm)]
pub struct Upload {
    pub file: TempFile,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct VkSettings {
    pub request: String,
    pub phone_number: String,
    pub password: String,
    pub timeout: String,
    pub api_key: String,
    pub is_handled: String,
    pub proxy: String
}