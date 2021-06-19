#!/usr/bin/env node
import { existsSync, mkdirSync } from 'fs';
import { newCore } from './core';
import { CONFIG_ROOT, DATA_ROOT } from './globals';
import { Server } from './net/server';

const app = newCore({});
const serv = new Server();

if (!existsSync(DATA_ROOT)) mkdirSync(DATA_ROOT);

const entityConfig = existsSync(CONFIG_ROOT)
    ? require(CONFIG_ROOT)
    : {};

serv.addListener("connect", (c) => app.addConnection(c));
serv.getPhysicalServer().listen(9999, "localhost");
