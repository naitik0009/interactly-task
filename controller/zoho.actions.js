const contact = require("../database/models/contact");
const axios = require("axios");
async function getAllContacts(request, response, next) {
    
    const { data_store } = request.body;

    try {
        if (!data_store) {
            return response.status(404).json({ status: "error", message: "invalid datastore" });
        }
        if (data_store === "CRM") {
            const uri = "https://www.zohoapis.com/crm/v2/Contacts";
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Zoho-oauthtoken 1000.ae5d3eb64441f897f8ec5467b6833547.be8a5439deee71f318704951a3d4f62e"
                },
            };
            const res = await fetch(uri, config).then((respon) => respon.json()).then((result) => {
                return response.status(200).json({ status: "success", message: result });
            }).catch((error) => {
                return response.status(404).json({ status: "error", message: "no contacts found try again", errorMessage: error });
            });

        } else if (data_store === "DATABASE") {
            const res = await contact.findAll();
            if (!res) {
                return response.status(404).json({ status: "error", message: "no contacts found try again" });
            }

            return response.status(200).json({ status: "success", message: res });
        }
    } catch (error) {
        return response.status(500).json({ status: "error", message: error.message });
    }


};

const getContact = async (request, response, next) => {
    const id = request.params.id;
    const { data_store } = request.body;

    try {
        if(!id){
            return response.status(404).json({ status: "error", message: "invalid please provide an id" }); 
        }
        if (!data_store) {
            return response.status(404).json({ status: "error", message: "invalid datastore" });
        }
        if (data_store === "CRM") {
            const uri = `https://www.zohoapis.com/crm/v2/Contacts/${id}`;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Zoho-oauthtoken 1000.ae5d3eb64441f897f8ec5467b6833547.be8a5439deee71f318704951a3d4f62e"
                },
            };
            const res = await fetch(uri, config).then((respon) => respon.json()).then((result) => {
                return response.status(200).json({ status: "success", message: result });
            }).catch((error) => {
                return response.status(404).json({ status: "error", message: "no contacts found try again", errorMessage: error });
            });

        } else if (data_store === "DATABASE") {
            const res = await contact.findByid(id);
            if (!res) {
                return response.status(404).json({ status: "error", message: "no contacts found try again" });
            }

            return response.status(200).json({ status: "success", message: res });
        }
    } catch (error) {
        return response.status(500).json({ status: "error", message: error.message });
    }


};

const createContact =async (request, response, next) => {

    try {
        const data = request.body.data;
        const trigger = request.body.trigger;
        const packet = {
            data,
            trigger
        }
        console.log(data,trigger);
        const {data_store} = request.body;
        if(!data_store){
            return response.status(404).json({ status: "error", message: "invalid datastore" });
        }
        if(!data){
            return response.status(404).json({ status: "error", message: "invalid data please provide correct data" });
        }
        if (data_store === "CRM") {
            const uri = "https://www.zohoapis.com/crm/v2/Contacts";
            const config = {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Zoho-oauthtoken 1000.7dc33484a4d0085a2f939ac270b28939.10935c2e956fa76f6c20f4a8a0db982b"
                },
                body:JSON.stringify(packet),
            };
            const res = await fetch(uri,config).then((respon) => respon.json()).then((result) => {
                return response.status(200).json({ status: "success", message: result });
            }).catch((error) => {
                return response.status(404).json({ status: "error", message: "no contacts found try again", errorMessage: error });
            });

        } else if (data_store === "DATABASE") {
            const {first_name,last_name,email,Phone} = request.body.data[0];
            const dbData = new contact({firstName:first_name,lastName:last_name,email,phone:Phone});
            const res = await dbData.save();
            if (!res) {
                return response.status(404).json({ status: "error", message: "no contacts found try again" });
            }

            return response.status(200).json({ status: "success", message: res });
        }
    } catch (error) {
        
    }
};

const updateContact = async (request, response, next) => {
    
    try {
       

        const {data_store} = request.body;
        if(!data_store){
            return response.status(404).json({ status: "error", message: "invalid datastore" });
        }

        if (data_store === "CRM") {
            const data = request.body.data;
            const trigger = request.body.trigger;
            const packet = {
                data,
                trigger
            }
            if(!data || !trigger){
                return response.status(404).json({ status: "error", message: "invalid data please provide correct data" });
            }
            console.log(data,trigger);
            const uri = "https://www.zohoapis.com/crm/v2/Contacts";
            const config = {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Zoho-oauthtoken 1000.7dc33484a4d0085a2f939ac270b28939.10935c2e956fa76f6c20f4a8a0db982b"
                },
                body:JSON.stringify(packet),
            };
            const res = await fetch(uri,config).then((respon) => respon.json()).then((result) => {
                return response.status(200).json({ status: "success", message: result });
            }).catch((error) => {
                return response.status(404).json({ status: "error", message: "no contacts found try again", errorMessage: error });
            });

        } else if (data_store === "DATABASE") {
            const id = request.params.id;
            console.log(id);
            if(!id){
                return response.status(404).json({status:"success",message:"Please provide a id"});
            }
            const {first_name,last_name,email,Phone} = request.body;
       
            const res = await contact.updateById(id,first_name,last_name,email,Phone);
            if (!res) {
                return response.status(404).json({ status: "error", message: "no contacts found try again" });
            }

            return response.status(200).json({ status: "success", message: res });
        }
    } catch (error) {
        return response.status(500).json({status:"error",message:error.message});
    }
};
const deleteContact = async (request, response, next) => {
    try {
        const id = request.params.id;
        const {data_store} = request.body;
        console.log(id);
        if(!data_store){
            return response.status(404).json({ status: "error", message: "invalid datastore" });
        }
        if(!id){
            return response.status(404).json({ status: "error", message: "please provide a id" });
        }
        if (data_store === "CRM") {
            const uri = `https://www.zohoapis.com/crm/v2/Contacts/${id}`;
            const config = {
                method:"DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Zoho-oauthtoken 1000.7dc33484a4d0085a2f939ac270b28939.10935c2e956fa76f6c20f4a8a0db982b"
                },
                
            };
            const res = await fetch(uri,config).then((respon) => respon.json()).then((result) => {
                return response.status(200).json({ status: "success", message: result });
            }).catch((error) => {
                return response.status(404).json({ status: "error", message: "no contacts found try again", errorMessage: error });
            });

        } else if (data_store === "DATABASE") {
            const res = await contact.deleteById(id);
            if (!res) {
                return response.status(404).json({ status: "error", message: "no contacts found try again" });
            }

            return response.status(200).json({ status: "success", message: res });
        }
    } catch (error) {
        return response.status(500).json({status:"error",message:error.message});
    }
};

module.exports = { getAllContacts, getContact,createContact, updateContact, deleteContact };