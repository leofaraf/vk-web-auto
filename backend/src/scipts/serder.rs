
use std::{fs::{self, File}, io::Write, path::PathBuf, process::{Child, Command}, sync::Arc};

use crate::types::{Res, Upload, VkSettings};

pub fn run() -> Res<Child> {
    let script_path = PathBuf::from("scripts\\VK2\\");
    let command = Command::new("python").arg("main.py").current_dir(script_path).spawn()?;
    Ok(command)
}

pub fn order(upload: Upload) -> Res<()>{
    let content = fs::read(upload.file.file.path())?;
    let order_path = PathBuf::from("scripts\\VK2\\order.txt");
    let mut file = File::create(order_path)?;
    file.write_all(&content)?;

    Ok(())
}

pub fn input(upload: Upload) -> Res<()>{
    let content = fs::read(upload.file.file.path())?;
    let order_path = PathBuf::from("scripts\\VK2\\input.csv");
    let mut file = File::create(order_path)?;
    file.write_all(&content)?;

    Ok(())
}

pub fn comments(upload: Upload) -> Res<()>{
    let content = fs::read(upload.file.file.path())?;
    let order_path = PathBuf::from("scripts\\VK2\\comments.txt");
    let mut file = File::create(order_path)?;
    file.write_all(&content)?;

    Ok(())
}

pub fn settings(data: VkSettings) -> Res<()>{
    let order_path = PathBuf::from("scripts\\VK2\\setting.txt");
    let mut file = File::create(order_path)?;
    writeln!(file, "{}", data.request)?;
    writeln!(file, "{}", data.phone_number)?;
    writeln!(file, "{}", data.password)?;
    writeln!(file, "{}", data.timeout)?;
    writeln!(file, "{}", data.api_key)?;
    writeln!(file, "input.csv")?;
    writeln!(file, "{}", data.is_handled)?;
    write!(file, "{}", data.proxy)?;

    Ok(())
}
