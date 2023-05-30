({
    init : function(component, event, helper) {

        // let actions = [{label:"Edit" ,name:"edit"},
        //                {label:"Delete", name:"delete"}
        //             ]

        component.set('v.columns',[

            {label:'Account Name', fieldName:'linkName', type:'url',typeAttributes: { label: { fieldName : 'Name' }, target:'_blank'}},

            {label:'Account Number', fieldName:'AccountNumber', type:'text'},
            {label:'Annual Revenue', fieldName:'AnnualRevenue', type:'currency' , cellAttributes: { alignment: 'left' }},
            {label:'Type', fieldName:'Type' , type:'text'},
            {type:'action', typeAttributes: {rowActions : [{label:'Edit', name:'edit'},{label:'Delete', name:'delete'}]}}
            
        ]);

        let action = component.get("c.accountData");
        action.setCallback(this, function(response){
            let state = response.getState();


            if (state === "SUCCESS"){
                console.log(response.getReturnValue());
                let record = response.getReturnValue();
                record.forEach(function(records){
                    records.linkName = '/' + records.Id;
                });
                component.set("v.details", record);

            }
        });
        $A.enqueueAction(action);

    }
})