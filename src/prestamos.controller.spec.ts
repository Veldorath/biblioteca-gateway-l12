import { UnauthorizedException } from '@nestjs/common';
import { PrestamosController } from './prestamos.controller';

describe('PrestamosController', () => {
  const controller = new PrestamosController();
  const original = global.fetch;

  afterEach(() => {
    global.fetch = original;
  });

  it('sin header Authorization responde 401 y no llama a nadie', async () => {
    const espia = jest.fn();
    global.fetch = espia;

    await expect(controller.listar()).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(espia).not.toHaveBeenCalled();
  });

  it('con un token que no es un JWT responde 401 y no llama al 3002', async () => {
    const espia = jest.fn();
    global.fetch = espia;

    await expect(controller.listar('Bearer holaquetal')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(espia).not.toHaveBeenCalled();
  });
});
