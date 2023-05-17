({
    init : function(component, event, helper) {
        component.set('v.columns',[
            {label:"First Name" , fieldName:"fst", type:"text"},
            {label:"Last Name", fieldName:"lst", type:"text"},
            {label:"Phone No.", fieldName:"phone", type:"integer"},
            {label:"E-mail", fieldName:"emailId", type:"email"}
        ]);
        console.log(JSON.stringify(data));

    }
});