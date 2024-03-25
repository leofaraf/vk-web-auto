use std::{env, fs::{self, read_to_string, remove_file, File}, io::Write, path::PathBuf, process::Command};

use actix_files::NamedFile;
use log::info;

use crate::types::{BarkovSettings, Res};

pub fn add_post(data: BarkovSettings) -> Res<()>{
    let settings_path = PathBuf::from(format!("scripts\\barkov111\\settings.txt"));
    let request_path = PathBuf::from(format!("scripts\\barkov111\\settings.xlsx"));

    info!("Removing files...");
    remove_file(&settings_path).unwrap_or(());
    remove_file(&request_path).unwrap_or(());

    info!("Creating settings.txt");
    let file_content = read_to_string(data.settings.file.path())?;
    println!("File content: {:?}", file_content);
    let mut orderfull = File::create(settings_path)?;
    orderfull.write_all(file_content.as_bytes())?;
    
    info!("Creating settings.xlsx");
    let file_content = fs::read(data.request.file.path())?;
    let mut orderfull = File::create(request_path)?;
    orderfull.write_all(&file_content)?;

    info!("Running python script");
    let script_path = PathBuf::from("scripts\\barkov111\\");
    Command::new("python").arg("barkov.py").current_dir(script_path).spawn()?.wait()?;

    Ok(())
}

pub fn remove_post(path: String) -> Result<(), Box<dyn std::error::Error>> {
    let script_path = PathBuf::from(format!("scripts\\barkov111\\Готовые Файлы\\{path}"));
    remove_file(script_path)?;

    Ok(())
}

pub fn get_posts() -> Result<Vec<String>, Box<dyn std::error::Error>> {
    let script_path = PathBuf::from("scripts\\barkov111\\Готовые Файлы\\");
    let paths = fs::read_dir(script_path)?;

    let mut path_names = vec![];
    for path in paths {
        if let Ok(file_name) = path.unwrap().file_name().into_string() {
            path_names.push(file_name);
        }
    }

    Ok(path_names)
}