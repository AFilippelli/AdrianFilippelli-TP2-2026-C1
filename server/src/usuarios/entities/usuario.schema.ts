//El Schema le habla a MongoDB: "guardá los datos así"

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Usuario{

    @Prop({ unique: true })
    email: string;

    @Prop()
    nombre: string;

    @Prop()
    apellido: string;

    @Prop( { unique: true } )
    nombre_de_usuario: string;

    @Prop()
    password: string;

    @Prop()
    fecha_nacimiento: Date;

    @Prop()
    descripcion_breve: string;

    @Prop({ type: String, default: null })
    foto_perfil: string | null;

    @Prop( { default: "usuario"} )
    perfil: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);