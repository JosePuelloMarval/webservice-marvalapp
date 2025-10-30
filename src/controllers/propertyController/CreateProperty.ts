import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Property } from '../../entities/Property';

export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      id,
      hc,
      name,
      typology,
      address,
      price_from_general,
      bathrooms,
      rooms,
      built_area,
      description,
      imagen_url
    } = req.body;
    
    if (
      !id ||
      !hc ||
      !name ||
      !typology ||
      !address ||
      !price_from_general ||
      !bathrooms ||
      !rooms ||
      !built_area ||
      !description ||
      !imagen_url
    ) {
      res.status(400).json({ error: 'Bad request, missing data' });
      return;
    }
    const PropertyBody = await Property.findOne({
      where: { hc: hc },
    });

    if (!PropertyBody) {
      const propertyRepository = AppDataSource.getRepository(Property);
      const proper = new Property();
      proper.id = id;
      proper.hc = hc;
      proper.name = name;
      proper.typology = typology;
      proper.address = address;
      proper.price_from_general = price_from_general;
      proper.bathrooms = bathrooms;
      proper.rooms = rooms;
      proper.built_area = built_area;
      proper.description = description;
      proper.imagen_url = imagen_url;
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
