<h1 align="center">LifeSinc</h1>
<p align="center"> 
  <img src="https://img.shields.io/badge/AdonisJS-^v6.9.0-green" alt="AdonisJS">
  <img src="https://img.shields.io/badge/npm-v9.8.1-red" alt="npm">
  <img src="https://img.shields.io/badge/node-vv21.6.2-blue" alt="node">
</p>
<br>

## About LifeSinc

<p>LIFESINC is the best health app for you, featuring calculators, real-time tracking, and personalized goals for a healthier life. Take control of your health journey with us!</p>

## How To Install 

1. clone the repository

```bash
git clone https://github.com/MhmmdIchsan/LifeSinc.git
```

2. go to folder and run

```bash
npm install
```

3. migrate the table

Copy the contents of `.env.example` file to new `.env` file:

```sh
cp .env.example .env
```

jika error jalankan

```sh
copy .env.example .env
```

Create an application encryption key:

```sh
node ace generate:key
```

ubah bagian APP_KEY di file .env dengan hasil generate:key

Create an empty database and fill in the `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DB_NAME`, `MYSQL_USER` and `MYSQL_PASSWORD` fields in the `.env` file to match the credentials of your newly created database.

following the .env file, change `MYSQL_DB_NAME = healthgearshare`, so make the empty database name is `healthgearshare`

Run the migrations:

```sh
node ace migration:fresh --seed
```

4. run serve with

```bash
node ace serve --watch
```
