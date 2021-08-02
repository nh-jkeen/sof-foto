export class HttpClient {

    private readonly _base : string | null = null;
    private readonly _apiKey : string | null = null;

    constructor(base: string, key: string | null = null){
        this._base = base;
        this._apiKey = key;
    }

    async Post(json: string, uri: string) : Promise<any> { 
        if(this._base){
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: json,
                redirect: 'follow' as RequestRedirect
            };
            
            if(this._apiKey){
                if(uri.includes("?"))
                    uri += `Api-Key=${this._apiKey}`;
                else
                    uri += `?Api-Key=${this._apiKey}`;
            }

            return await (await fetch(`${this._base}${uri}`, requestOptions)).json();
        }
    }

    async Get(uri: string) : Promise<any> {
        if(this._base){
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json", },
            };

            if(this._apiKey){
                if(uri.includes("?"))
                    uri += `Api-Key=${this._apiKey}`;
                else
                    uri += `?Api-Key=${this._apiKey}`;
            }

            return await (await fetch(`${this._base}${uri}`, requestOptions)).json();
        }
    }
}