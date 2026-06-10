import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Comentario{

    @Prop()
    mensaje: string;

    @Prop()
    usuario: string;

    @Prop()
    publicacion: string;

    @Prop()
    fecha: Date;

    @Prop({ default: false })
    modificado: boolean;

}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);