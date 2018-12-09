export class User {
    _id?: String;
    username: String;
    email: String;
    password: String;
    image?:{
        path:String,
        originalname:String;
    }
}
