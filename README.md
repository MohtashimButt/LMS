# LearningManagementSystem
A comprehensive course management site where students and instructors can manage their respective academic tasks

## SCHEMA
![shema_image](https://github.com/MohtashimButt/LearningManagementSystem/blob/master/stuff/pyara_schema.png)

## Project running
To run this project, follow the following steps:
1. clone the repo via:
```
git clone "https://github.com/MohtashimButt/LearningManagementSystem.git"
```
2. In the `server` folder, you'll find a `.env` file where you're supposed to change the `MONG_URI` according to your mongodb cluster. You can also provide a different `PORT`.
3. Open two terminals in the `LearningManagementSystem` folder simultaneously.
4. In one terminal do `cd client`. This will be your client side. In the other terminal, type `cd server`. This will be your server side.
5. Run the following commands on the client side:
```
npm i
npm start
```
6. Run the following commands on the server side:
```
npm run dev
```
7. Your web application will now be hosted on port number you provided in your `.env` file.

## General Rules:
1. Every username is an email that must contain "@lums.edu.pk".
2. Admin's username must start with "99". For example, "993453@lums.edu.pk".
3. Instructor's username must start with "00". For example, "00235@lums.edu.pk".
4. Student's username must start with "2" and the total length of student's username must be 20 (inclusing the @lums.edu.pk). For example, "24100238@lums.edu.pk".
## Made by MA & MB
