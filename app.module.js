"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("./whatsapp/whatsapp.service");
const whatsapp_controller_1 = require("./whatsapp/whatsapp.controller");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_module_1 = require("./auth/auth.module");
const email_ferozo_module_1 = require("./email/ferozo/email/email.ferozo.module");
const contacts_email_service_1 = require("./contacts/email/contacts.email.service");
const contacts_email_controller_1 = require("./contacts/email/contacts.email.controller");
const contacts_whatsapp_controller_1 = require("./contacts/whatsapp/contacts.whatsapp.controller");
const contacts_whatsapp_service_1 = require("./contacts/whatsapp/contacts.whatsapp.service");
const axios_1 = require("@nestjs/axios");
const role_module_1 = require("./role/role.module");
const expediente_module_1 = require("./expediente/expediente.module");
const suppliers_module_1 = require("./suppliers/suppliers.module");
const supplier_products_controller_1 = require("./supplier-products/supplier-products.controller");
const supplier_products_service_1 = require("./supplier-products/supplier-products.service");
const suppplier_products_module_1 = require("./supplier-products/suppplier-products.module");
const products_service_1 = require("./products/products.service");
const products_module_1 = require("./products/products.module");
const category_controller_1 = require("./category/category.controller");
const category_module_1 = require("./category/category.module");
const category_service_1 = require("./category/category.service");
const custom_message_controller_1 = require("./custom-message/custom-message.controller");
const custom_message_service_1 = require("./custom-message/custom-message.service");
const custom_message_module_1 = require("./custom-message/custom-message.module");
const quotation_history_controller_1 = require("./quotation-history/quotation-history.controller");
const quotation_history_service_1 = require("./quotation-history/quotation-history.service");
const quotation_history_module_1 = require("./quotation-history/quotation-history.module");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
const users_module_1 = require("./users/users.module");
const attachments_controller_1 = require("./attachments/attachments.controller");
const attachments_service_1 = require("./attachments/attachments.service");
const attachments_module_1 = require("./attachments/attachments.module");
const company_name_controller_1 = require("./company_name/company_name.controller");
const company_name_service_1 = require("./company_name/company_name.service");
const company_name_module_1 = require("./company_name/company_name.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            axios_1.HttpModule,
            role_module_1.RoleModule,
            expediente_module_1.ExpedienteModule,
            suppliers_module_1.SuppliersModule,
            suppplier_products_module_1.SupplierProductsModule,
            products_module_1.ProductsModule,
            category_module_1.CategoryModule,
            custom_message_module_1.CustomMessageModule,
            quotation_history_module_1.QuotationHistoryModule,
            users_module_1.UsersModule,
            email_ferozo_module_1.FerozoEmailModule,
            attachments_module_1.AttachmentsModule,
            company_name_module_1.CompanyNameModule
        ],
        controllers: [
            whatsapp_controller_1.WhatsappController,
            contacts_email_controller_1.ContactsEmailController,
            contacts_whatsapp_controller_1.ContactsWhatsappController,
            supplier_products_controller_1.SupplierProductsController,
            category_controller_1.CategoryController,
            custom_message_controller_1.CustomMessageController,
            quotation_history_controller_1.QuotationHistoryController,
            users_controller_1.UsersController,
            attachments_controller_1.AttachmentsController,
            company_name_controller_1.CompanyNameController,
        ],
        providers: [
            whatsapp_service_1.WhatsappService,
            prisma_service_1.PrismaService,
            contacts_email_service_1.ContactsEmailService,
            contacts_whatsapp_service_1.ContactsWhatsappService,
            products_service_1.ProductsService,
            supplier_products_service_1.SupplierProductsService,
            category_service_1.CategoryService,
            custom_message_service_1.CustomMessageService,
            quotation_history_service_1.QuotationHistoryService,
            users_service_1.UsersService,
            attachments_service_1.AttachmentsService,
            company_name_service_1.CompanyNameService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map