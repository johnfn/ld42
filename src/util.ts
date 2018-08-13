class Util {
  public static RandElem<T>(x: T[]): T {
    return x[Math.floor(Math.random() * x.length)];
  }

  public static RandRange(low: number, high: number): number {
    return low + Math.random() * (high - low);
  }

  public static RandIntRange(low: number, high: number): number {
    return low + Math.floor(Math.random() * (high + 1 - low));
  }

  public static SortByKey<T>(array: T[], key: (t: T) => number): T[] {
    return array.sort((a, b) => {
      const x = key(a);
      const y = key(b);

      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  public static ManhattanDistance(c1: { x: number, y: number }, c2: { x: number, y: number }): number {
    return (
      Math.abs(c1.x - c2.x) + 
      Math.abs(c1.y - c2.y)
    );
  }

  public static componentToHex(c: number): string {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  public static rgbToHex(r: number, g: number, b: number): string {
    return "#" + Util.componentToHex(r) + Util.componentToHex(g) + Util.componentToHex(b);
  }

  public static rgbToHexNumber(r: number, g: number, b: number): number {
    return ((1 << 24) + (r << 16) + (g << 8) + b);
  }
  
  public static Sign(x: number): number {
    if (x > 0) return  1;
    if (x < 0) return -1;

    return 0;
  }

  public static Pad(num: string, size: number){ 
    return ('000000000' + num).substr(-size); 
  }
}