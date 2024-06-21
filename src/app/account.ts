export class Account {
    name:string;
    phone:string;
    username:string;
    password:string;
    cpassword:string
    usertype:string;
    activated:boolean;

    constructor(name,phone,username,password,cpassword,utype)
{
    this.name=name;
    this.phone=phone;
    this.username=username;
    this.password=password;
    this.cpassword=cpassword;
    this.usertype=utype;
}
}
