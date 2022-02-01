# Time managing app

## Description
An app that helps to manage one's tasks.

## Technologies
- Front-end part is written in JS using **React** (*react*, *react-router-dom*).
- Back-end is written in Python using **Django** (*django*, *rest_framework*, *rest_framework_simplejwt*).

## Lauch (Mac and Linux)

- Clone this repo and go navigate to it.
```shell
git clone https://github.com/timur3v/Time-Managing-App 
```

- Navigate to folder with package.json.
```shell
cd Time-Managing-App/front
```

- To launch front-end one can use `npm`. Install it and then run the following to install node_modules.
```shell
npm install
```

- Launch front-end.
```shell
npm start
```

- Now to start back-end server navigate to back folder.

```shell
cd ../back 
```

- Make sure you have all needed libraries (can be downloaded using requirements.txt). Then run server app.

```shell
./manage.py runserver
```