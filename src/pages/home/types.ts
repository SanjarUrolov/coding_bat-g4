export interface HomeProps {}

export interface Language {
  id: string;
  title: string;
  url: string;
}

export interface Section {
  id: number;
  title: string;
  url: string;
  description: string;
  maxRate: number;
}

export interface Problem{
  description:string, 
id: number,
methodSignature: string,
section:number,
title:string
}