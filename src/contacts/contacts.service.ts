import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) {}

  async changeStatus(id: string, status: string): Promise<Contact | null> {
    return this.contactModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async createContact(contactData: Contact): Promise<Contact> {
    const newContact = new this.contactModel(contactData);
    return newContact.save();
  }

  async getAllContacts(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }
} 