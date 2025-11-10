import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Property } from '../../entities/Property';

export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      typology,
      price,
      value_of_mandatory_kits,
      unit_number,
      parking_spaces,
      bathrooms,
      rooms,
      built_area,
      description,
      imagen_url,
      id_realstate,
    } = req.body;

    if (
      !name ||
      !typology ||
      !price ||
      !value_of_mandatory_kits ||
      !unit_number ||
      !parking_spaces ||
      !bathrooms ||
      !rooms ||
      !built_area ||
      !description ||
      !imagen_url ||
      !id_realstate
    ) {
      res.status(400).json({ error: 'Bad request, missing data' });
      return;
    }
    const PropertyBody = await Property.findOne({
      where: { name: name },
    });

    if (!PropertyBody) {
      const propertyRepository = AppDataSource.getRepository(Property);
      const proper = new Property();
      proper.name = name;
      proper.typology = typology;
      proper.price = price;
      proper.value_of_mandatory_kits = value_of_mandatory_kits;
      proper.unit_number = unit_number;
      proper.parking_spaces = parking_spaces;
      proper.bathrooms = bathrooms;
      proper.rooms = rooms;
      proper.built_area = built_area;
      proper.description = description;
      proper.imagen_url = imagen_url;
      proper.realstate = id_realstate;
      const createProperty = await propertyRepository.save(proper);
      res.status(201).json({ id: createProperty.id });
      return;
    }
    res.status(500).json({ message: 'Ya existe un proyecto inmobiliario con este hc' });
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
