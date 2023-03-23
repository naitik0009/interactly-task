const {connect} = require("../mysql");
class Contacts{
    constructor(firstName,lastName,email,phone){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }
    
    save(){
        let sql = `
        INSERT INTO 
        contacts(firstName,lastName,email,phone)
        VALUES('${this.firstName}','${this.lastName}','${this.email}','${this.phone}')
        `;
        const newUser=connect.query(sql);
        return newUser;
    }

    static  findAll(){
        let sql = `SELECT * FROM contacts;`;
        return connect.query(sql);
    };

    static  findByid(id){
        let sql = `SELECT * FROM contacts WHERE id = ${id};`;
        return connect.query(sql);
    };

    static updateById(id,first,last,email,phone){
        console.log(id,first,last,email,phone);
        let sql  = `UPDATE contacts SET firstName = ${first}, lastName = ${last}, email=${email}, phone = ${phone} WHERE id = ${id}`;
        return connect.query(sql);
    }

    static deleteById(id){
        let sql = `DELETE FROM contacts WHERE contacts.id=${id}`;
        return connect.query(sql);
    }

}

module.exports=Contacts;