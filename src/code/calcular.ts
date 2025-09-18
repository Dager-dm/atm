export function calcular(valort: number) {
    let valora = 0, s = 0;
    let c1 = 0, c2 = 0, c5 = 0, c10 = 0, acarreo = 0;
    const v = [10000, 20000, 50000, 100000];
    let bill: boolean;
  
    while (valora !== valort) {
      bill = false;
  
      // El for inicia en la posición de acarreo
      for (let i = acarreo; i < v.length; i++) {
        s = valora + v[i];
        if (s <= valort) {
          valora += v[i];
          bill = true;
          switch (v[i]) {
            case 10000:
              c1++;
              break;
            case 20000:
              c2++;
              break;
            case 50000:
              c5++;
              break;
            case 100000:
              c10++;
              break;
          }
        }
      }
  
      if (!bill) {
        // Si no se entregó ningún billete, se reinicia el acarreo
        acarreo = 0;
      } else {
        // Si se entregó un billete, incrementa el acarreo
        acarreo++;
        // Si acarreo supera el tamaño, reinicia
        if (acarreo >= v.length) {
          acarreo = 0;
        }
      }
    }
  
    return {
      billetes: {
        "10k": c1,
        "20k": c2,
        "50k": c5,
        "100k": c10,
      }
    };
  }
  