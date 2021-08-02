import * as R4 from 'fhir/r4';

export class Patient  {

    private internalID: number | null = null;
    private firstName: string = "";
    private lastName: string = "";
    private middleIntial: string = "";
    private dateOfBirth: Date | null = null;
    private email: string = "";
    private gender: string = "";
    private language: string = "";
    private externalID: string = "";
    private externalSiteID: string = "";
    private alias: string = "";

    set InternalID(id : number | null){
        this.internalID = id;
    }

    get InternalID(){
        return this.internalID;
    }

    set ExternalSiteID(id : R4.Reference | string){
        if(typeof id !== "string"){
            if(id && id.reference){
                this.externalSiteID = id.reference.toLowerCase().replace("organization/", "");
            }
        }
        else if(id){
            this.externalSiteID = id;
        }
    }

    get ExternalSiteID(){
        return this.externalSiteID;
    }

    get ExternalID(){
        return this.externalID;
    }

    set ExternalID(id : R4.Identifier | string){
        if(typeof id !== "string"){
            if(id && id.value){
                this.externalID = id.value;
            }
        }
        else if(id){
            this.externalID = id;
        }
    }

    set Language(lang : R4.PatientCommunication | string){
        if(typeof lang !== "string"){
            if(lang && lang.language.coding){
                this.language = lang.language.coding[0].code ?? "";
            }
        }
        else if(lang){
            this.language = lang.substring(0,2);
        }
    }

    get Language(){
        return this.language;
    }

    set Gender(gender : string){
        if(gender.length > 0){
            this.gender = gender[0];
        }
    }

    get Gender(){
        return this.gender;
    }

    set Email(email: R4.ContactPoint | string){
        if(email){
            let em : string = "";

            if(typeof email !== "string"){
                if(email.value){
                    em = email.value;
                }
            }
            else{
                em = email;
            }
    
            if(em.includes("@") && em.includes(".")){
                this.email = em;
            }
        }
    }

    get Email(){
        return this.email;
    }

    set DateOfBirth(date: string){
        this.dateOfBirth = new Date(date);
    }

    get DateOfBirth(){
        return this.dateOfBirth?.toDateString() ?? "";
    }

    get DateOfBirthStr(){
        if(this.dateOfBirth)
            return `/Date(${this.dateOfBirth.getTime()}-0400)/`

        return null;
    }

    set Name(name: R4.HumanName | string){
        if(typeof name !== "string"){
            if (name.family){
                this.lastName = name.family;
            }
            
            if(name.given){
                if(name.given?.length > 0){
                    this.firstName = name.given[0];
                }
    
                if(name.given.length > 1){
                    this.middleIntial = name.given[1][0];
                }
            }
        }
        else{
            const nameParts: string[] = name.split(" ");

            if(nameParts.length > 1){
                this.firstName = nameParts[0];

                if(nameParts.length > 2){
                    this.middleIntial = nameParts[1][0];
                    this.lastName = nameParts[2];
                }
                else{
                    this.lastName = nameParts[1];
                }
            }
        }
    }

    get Name(){
        return `${this.firstName} ${this.middleIntial} ${this.lastName}`;
    }

    set FirstName(fName: string){
        this.firstName = fName;
    }

    get FirstName(){
        return this.firstName;
    }

    set LastName(lName: string){
        this.lastName = lName;
    }

    get LastName(){
        return this.lastName;
    }

    set MiddleIntitial(mInitial: string){
        if(mInitial){
            this.middleIntial = mInitial[0];
        }
    }

    get MiddleInitial(){
        return this.middleIntial;
    }

    ToJSON() : string {
        return JSON.stringify({
            FirstName: this.FirstName,
            LastName: this.LastName,
            Alias: "",
            DateOfBirth: this.DateOfBirthStr,
            Email: this.Email,
            ExternalID: this.ExternalID,
            ExternalSiteID: this.ExternalSiteID,
            Gender: this.Gender,
            Language: this.Language,
            MiddleInitial: this.MiddleInitial
        });
    }

    static FromResource(pat: R4.Patient) {
        const patient = new Patient();
        
        if(pat.id)
            patient.ExternalID = pat.id;

        if(pat.communication)
            patient.Language = pat.communication[0];

        if(pat.gender)
            patient.Gender = pat.gender;

        if(pat.name)
            patient.Name = pat.name.filter((x) => x.use == "official")[0] as R4.HumanName;

        if(pat.birthDate)
            patient.DateOfBirth = pat.birthDate; 

        if(pat.telecom)
            patient.Email = pat.telecom.filter((x) => x.system == "email")[0];

        if(pat.managingOrganization)
            patient.ExternalSiteID = pat.managingOrganization;
            
        return patient;
    }
}