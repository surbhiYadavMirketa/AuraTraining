({
    checkType : function(component, event, helper) {
        let type = event.getParam("value");
        component.set("v.isMandatory", type)
    },
    successful : function(component, event, helper){
        component.find('notifLib').showNotice({
            "variant": "Error",
            "title": "Something went wrong!!!",
            "message": "Account Number is Mandatory to fill!!!"
        });
    }
})