
export class FacetsStore{
    constructor(){
        this._facet=[]
    }
    setFacets(facet){
        this._facet=facet
    }
    getFacets(){
        return this._facet
    }
}