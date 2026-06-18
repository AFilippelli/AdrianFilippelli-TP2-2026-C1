import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Publicacion{

    @Prop()
    titulo: string;

    @Prop()
    mensaje: string;

    @Prop({ type: String, default: null })
    imagen: string | null;

    @Prop({ default: []})
    me_gusta: string[];

    @Prop()
    usuario_publicacion: string;

    @Prop()
    fecha: Date;

    @Prop({ default: true })
    activa: boolean;

}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);