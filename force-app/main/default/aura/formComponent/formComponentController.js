({
    myAction : function(component, event, helper) {
        let acc = component.get("v.acc");        //acc->Object
        let account_List = component.get("v.account_List"); //list


        //Push from acc to List
        account_List.push(acc);

        component.set("v.acc",{'sobjectType':'Account'});
        component.set("v.account_List",account_List);

    }
})