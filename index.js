'use strict';
// HTTPのクライアントモジュールの読み込み
const axios = require('axios');

// ファイルシステムモジュールの読み込み
const fs = require('fs');

// ファイルを一行ずつ読み込むモジュールの読み込み
const readline = require('readline');

// passwordファイルを読み取り、一行ずつ読み込むモジュールを読み込む
const rs = fs.ReadStream('password');
const rl = readline.createInterface({ input: rs, output: {} });

// ファイルが一行読まれたときの処理
rl.on('line', line => {
    // 不正アクセス禁止法に抵触しないよう自分の開発アプリケーションの検証用途に用いること
    axios
        .get(`http://admin:${line}@app:8000/posts`) // Basic認証でアクセスする
        .then(response => { // エラーが出なかった場合の処理
            if (response.status === 200) {
                console.log(`Password is "${line}"`);
                process.exit(); // プロセスの終了
            }
        })
        .catch(error => {}); // エラー時は何もしない
});

// オブジェクトがファイルを読み終わった際に実行
rl.on('close', () => {
    console.log('password file was closed.');
});
