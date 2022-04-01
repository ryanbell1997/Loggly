import { Tag } from "../layout/models/tag";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import { makeAutoObservable } from "mobx";

export default class LogStore {
    loading: boolean = false;
    selectedTag: Tag | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    createTag = async(tag: Tag) => {
        this.loading = true;
        try {
            tag.id = uuid();
            const returnedTag : Tag = await agent.Tags.create(tag);
            
            //TODO Set the selectedTag to the returned tag.
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (state : boolean) => {
        this.loading = state;
    }

    setSelectedTag = ( tag : Tag | undefined) => {
        if(tag !== undefined) {
            this.selectedTag = tag;
        }
    }
}