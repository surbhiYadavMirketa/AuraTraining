({
    myAction : function(component, event, helper) {
        let FirstName = component.find("firstName").get("v.value");
        let LastName = component.find("lastName").get("v.value");
        let Phone = component.find("phoneNumber").get("v.value");
        let Email = component.find("email").get("v.value");

        let array1 = ["firstName","lastName","phoneNumber","email"];

        // For Report Validity 
        if(FirstName=='' || LastName=='' || Phone=='' || Email == '' ){
            for(let i=0;i<array1.length;i++){
                    component.find(array1[i]).reportValidity();
            }
            return;
        }

        let records = {
            "fst" : FirstName,
            "lst" : LastName,
            "phone" : Phone,
            "emailId" : Email
        };
        //component.set("v.details",records);
        

        // let eve $A Used to reterieve the applicationEvent 
        let eve = $A.get("e.c:applicationEvent");
        eve.setParams({"tableDetails":records});
        // console.log(JSON.stringify(data));
        
        console.log("Event Fired");
        eve.fire();

        component.find("firstName").set("v.value","");
        component.find("lastName").set("v.value", "");
        component.find("phoneNumber").set("v.value", "");
        component.find("email").set("v.value", "");

    }
})