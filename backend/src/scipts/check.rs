use std::{env, fs::{read_to_string, remove_file, File}, io::Write, path::{Path, PathBuf}, process::{Command, Stdio}};
use calamine::{open_workbook, RangeDeserializerBuilder, Reader, Xlsx};

use crate::types::{Account, CheckEntry, PreCheckAccount};

pub fn run(path: &Path) -> Result<Vec<Account>, Box<dyn std::error::Error>> {
    // Go to script dir        
    let script_path = PathBuf::from("scripts\\сheck\\");
    let orderfull_path = PathBuf::from("scripts\\сheck\\orderfull.txt");

    remove_file("orderfull.txt").unwrap_or(());
    remove_file("output.xlsx").unwrap_or(());

    let file_content = read_to_string(path)?;
    println!("File content: {:?}", file_content);
    let mut orderfull = File::create(orderfull_path)?;
    orderfull.write_all(file_content.as_bytes())?;

    println!("Python script");
    // Running script
    Command::new("python").arg("check.py").current_dir(script_path).spawn()?.wait()?;

    output()
}

pub fn output() -> Result<Vec<Account>, Box<dyn std::error::Error>> {
    // Read answer
    let output_path = PathBuf::from("scripts\\сheck\\output.xlsx");
    let mut excel: Xlsx<_> = open_workbook(output_path)?;

    let range = excel
        .worksheet_range("Sheet1")
        .map_err(|_| calamine::Error::Msg("Cannot find Sheet1"))?;

    let iters =
        RangeDeserializerBuilder::with_headers(&["phone_number", "token", "status"]).from_range(&range)?;

    let mut accounts: Vec<Account> = vec![];
    for (index, item) in iters.into_iter().enumerate() {
        let entry: CheckEntry = item?;
        let acc = Account {
            phone_number: entry.phone_number,
            token: entry.token,
            status: entry.status,
        };
        accounts.push(acc);
    }
    Ok(accounts)
}