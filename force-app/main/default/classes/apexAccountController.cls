public class apexAccountController {
    @AuraEnabled
    public static Account getAccount(Id accountId){
        try {
            return [SELECT Name, AccountNumber, AnnualRevenue, Type FROM account WHERE Id=:accountId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Account> accountDetails(Integer offset){
        try {
            return [SELECT Name, AccountNumber, AnnualRevenue, Type 
                    FROM Account 
                    ORDER BY CreatedDate DESC 
                    LIMIT 20 OFFSET :offset];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }   
    }

    @AuraEnabled
    public static Integer accountCount(){
        try {
            Integer recordCount = [SELECT COUNT() FROM Account];
            return recordCount;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Id createAccount(Account acc){
        try {
            if(acc.Id == null){
                insert acc;
            }
            else{
                update acc;
            }
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return acc.Id;
    }

    @AuraEnabled
    public static void deleteAccount(Account acc){
    try{
        delete acc;
    }
    catch(Exception e){
        throw new AuraHandledException(e.getMessage());
        }
    }

    // @AuraEnabled
    // public static Map<String, String> getTypeValue(){
    //     Map<String, String> options = new Map<String, String>();

    //     // Schema.DescribeFieldResult is used to provide metadata information about any specific field of an object 
    //     Schema.DescribeFieldResult fieldResult = Account.Type.getDescribe();

    //     // Here getPicklistValues methods reterives the picklist values from the field and store it in pValues which is of list type and contains a single picklist values
    //     List<Schema.PicklistEntry> pValues = fieldResult.getPicklistValues();  
    //     for(Schema.PicklistEntry p : pValues){
    //         options.put(p.getValue(), p.getLabel());
    //     }
    //     return options;
    
    
}