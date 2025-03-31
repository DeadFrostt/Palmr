import { LogoService } from "./logo.service";
import { AppService } from "./service";
import { FastifyReply, FastifyRequest } from "fastify";
import path from 'path';
import fs from 'fs';

const uploadsDir = path.join(process.cwd(), 'uploads/logo');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export class AppController {
  private appService = new AppService();
  private logoService = new LogoService();

  async getAppInfo(request: FastifyRequest, reply: FastifyReply) {
    try {
      const appInfo = await this.appService.getAppInfo();
      return reply.send(appInfo);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async getAllConfigs(request: FastifyRequest, reply: FastifyReply) {
    try {
      const configs = await this.appService.getAllConfigs();
      return reply.send({ configs });
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async updateConfig(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { key } = request.params as { key: string };
      const { value } = request.body as { value: string };

      const config = await this.appService.updateConfig(key, value);
      return reply.send({ config });
    } catch (error: any) {
      if (error.message === "Configuration not found") {
        return reply.status(404).send({ error: error.message });
      }
      return reply.status(400).send({ error: error.message });
    }
  }

  async bulkUpdateConfigs(request: FastifyRequest, reply: FastifyReply) {
    try {
      const updates = request.body as Array<{ key: string; value: string }>;
      const configs = await this.appService.bulkUpdateConfigs(updates);
      return reply.send({ configs });
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async uploadLogo(request: FastifyRequest, reply: FastifyReply) {
    try {
      const file = await request.file();
      if (!file) {
        return reply.status(400).send({ error: "No file uploaded" });
      }

      if (!file.mimetype.startsWith('image/')) {
        return reply.status(400).send({ error: "Only images are allowed" });
      }

      const buffer = await file.toBuffer();
      const base64Logo = await this.logoService.uploadLogo(buffer);
      await this.appService.updateConfig("appLogo", base64Logo);

      return reply.send({ logo: base64Logo });
    } catch (error: any) {
      console.error("Upload error:", error);
      return reply.status(400).send({ error: error.message });
    }
  }

  async removeLogo(request: FastifyRequest, reply: FastifyReply) {
    try {
      await this.logoService.deleteLogo();
      return reply.send({ message: "Logo removed successfully" });
    } catch (error: any) {
      console.error("Logo removal error:", error);
      return reply.status(400).send({ error: error.message });
    }
  }
}
