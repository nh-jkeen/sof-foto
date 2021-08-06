import { Episode } from "./FOTO/Episode";

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

    async MockGetPatientEpisodes(uri: string) : Promise<any> {
        return new Promise(function(resolve){
            resolve([
                {
                    "BodyPartId": 18,
                    "BodyPartText": "Lumbar Spine1",
                    "CreateDate": "/Date(1627055636747-0400)/",
                    "EpisodeId": 21153,
                    "ImpairmentId": 50,
                    "ImpairmentText": "NOC-musculo-skeletal disorder",
                    "TherapistName": "Han Solo"
                },
                {
                    "BodyPartId": 18,
                    "BodyPartText": "Lumbar Spine",
                    "CreateDate": "/Date(1627055636747-0400)/",
                    "EpisodeId": 21152,
                    "ImpairmentId": 50,
                    "ImpairmentText": "NOC-musculo-skeletal disorder",
                    "TherapistName": "Han Solo"
                },
            ] as Array<Episode>)
        });
    }
}