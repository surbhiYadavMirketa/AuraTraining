({
    init : function(component, event, helper) {
        component.set('v.columns',[
            {label:"First Name" , fieldName:"fst", type:"text"},
            {label:"Last Name", fieldName:"lst", type:"text"},
            {label:"Phone No.", fieldName:"phone", type:"integer"},
            {label:"E-mail", fieldName:"emailId", type:"email"}
        ]);

    },

    applicationEvent : function(component, event, helper){
        console.log("Event Handled");
        
        // table component data -> dataMap which is [] empty.
        let dataMap = component.get("v.details");

        // Form data to event then to table
        let formdata = event.getParams("tableDetails");

        //Now push formdata to dataMap
        dataMap.push(formdata);
        console.log(JSON.stringify(dataMap));
        component.set("v.details",dataMap);
        console.log("data stored");


        // [{"fst":"surbhi","lst":"ydahbjh","phone":"7894561230","emailId":"sur@hb.com"}]

        // [{"tableDetails":{"fst":"surbhi","lst":"ydahbjh","phone":"7894561230","emailId":"sur@hb.com"}}]

    }
});