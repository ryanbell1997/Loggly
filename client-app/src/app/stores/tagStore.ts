import { Tag } from "../layout/models/tag";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import { makeAutoObservable } from "mobx";
import { store } from "./store";

export default class TagStore {
    loading: boolean = false;
    selectedTag: Tag | undefined;
    isModalOpen: boolean = false;
    tags = new Map<string, Tag>();
    tagArray: Tag[] | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    populateTagArray = () => {
        this.tagArray = Array.from(this.tags.values());
    }

    getTags = async() => {
        this.loading = true;
        try {
            const tags = await agent.Tags.list();;
            tags.forEach(tag => {
                this.tags.set(tag.id, tag);
            })
            this.populateTagArray();
            this.setLoading(false);
        }
        catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    createTag = async(tag: Tag) => {
        this.loading = true;
        store.formModalStore.setIsFormModalOpen(true);
        try {
            tag.id = uuid();
            const returnedTag : Tag = await agent.Tags.create(tag);
            this.tags.set(returnedTag.id, returnedTag);
            this.populateTagArray();
            //TODO Set the selectedTag to the returned tag.
            store.formModalStore.setIsFormModalOpen(false);
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    editTag = async(tag: Tag) => {
        this.loading = true;
        store.formModalStore.setIsFormModalOpen(true);
        try {
            const returnedTag : Tag = await agent.Tags.update(tag.id, tag);
            store.formModalStore.setIsFormModalOpen(false);
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    createOrEditTag = async(tag : Tag) => {
        if(!tag.hourlyRate) tag.hourlyRate = 0; 
        if(tag.id === ""){
            this.createTag(tag);
        }
        else {
            this.editTag(tag);
        }
    }

    openForm = (id?: string) => {
        id ? this.selectTag(id) : this.cancelSelectedTag();
        store.formModalStore.setIsFormModalOpen(false);
    }

    selectTag = (id : string) => {
        this.selectedTag = this.tags.get(id);
    }

    cancelSelectedTag = () => {
        this.selectedTag = undefined;
    }

    setLoading = (state : boolean) => {
        this.loading = state;
    }

    setSelectedTag = ( tag : Tag | undefined) => {
        if(tag !== undefined) {
            this.selectedTag = tag;
        }
    }

    openTagModal = (state : boolean) => {
        this.isModalOpen = state;
    }
}