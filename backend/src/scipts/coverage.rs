use std::{fs::{self, read_to_string, remove_file, File}, io::Write, path::PathBuf, process::Command};

use log::info;

use crate::{scipts::coverage, types::{Res, Upload}};

pub fn run(form: Upload) -> Res<()> {
    info!("Writing settings");
    let file_content = fs::read(form.file.file.path())?;
    let settings_path = PathBuf::from(format!("scripts\\Охваты\\settings.txt"));
    let mut file = File::create(settings_path)?;
    file.write_all(&file_content)?;

    info!("Running python script");
    let script_path = PathBuf::from("scripts\\Охваты\\");
    Command::new("python").arg("get_views_from_post.py").current_dir(script_path).spawn()?.wait()?;
    Ok(())
}

pub fn remove(path: String) -> Res<()>{
    let script_path = PathBuf::from(format!("scripts\\Охваты\\Готовые файлы\\{path}"));
    remove_file(script_path)?;

    Ok(())
}

pub fn add_file(form: Upload) -> Res<()> {
    info!("Adding file");
    let file_content = fs::read(form.file.file.path())?;
    let file_name = form.file.file_name.unwrap();
    let post_path = PathBuf::from(format!("scripts\\Охваты\\Готовые файлы\\{file_name}"));
    let mut post = File::create(post_path)?;
    post.write_all(&file_content)?;

    Ok(())
}

pub fn get_files() -> Res<Vec<String>> {
    let script_path = PathBuf::from("scripts\\Охваты\\Готовые файлы\\");
    let paths = fs::read_dir(script_path)?;

    let mut path_names = vec![];
    for path in paths {
        if let Ok(file_name) = path.unwrap().file_name().into_string() {
            path_names.push(file_name);
        }
    }

    Ok(path_names)
}