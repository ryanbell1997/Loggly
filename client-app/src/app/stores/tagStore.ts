import { Tag } from "../layout/models/tag";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import { makeAutoObservable } from "mobx";
import { store } from "./store";

export default class LogStore {
    loading: boolean = false;
    selectedTag: Tag | undefined;
    isModalOpen: boolean = false;
    tags = new Map<string, Tag>();

    constructor() {
        makeAutoObservable(this);
    }

    createTag = async(tag: Tag) => {
        this.loading = false;
        store.formModalStore.setIsFormModalOpen(true);
        try {
            tag.id = uuid();
            const returnedTag : Tag = await agent.Tags.create(tag);
            
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