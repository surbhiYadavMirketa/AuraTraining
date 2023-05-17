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

        let records = component.get("v.data");
        records.push({
            fst : FirstName,
            lst : LastName,
            phone : Phone,
            emailId : Email
        })

        component.set("v.data",records);

        component.find("firstName").set("v.value", "");
        component.find("lastName").set("v.value", "");
        component.find("phoneNumber").set("v.value", "");
        component.find("email").set("v.value", "");

    }
})