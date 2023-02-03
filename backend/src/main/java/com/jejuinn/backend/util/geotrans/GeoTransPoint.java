package com.jejuinn.backend.util.geotrans;

public class GeoTransPoint {
    double x;
    double y;
    double z;

    public GeoTransPoint() {
        super();

    }

    public GeoTransPoint(double x, double y) {
        super();
        this.x = x;
        this.y = y;
        this.z = 0;
    }

    public GeoTransPoint(double x, double y, double z) {
        super();
        this.x = x;
        this.y = y;
        this.z = 0;
    }


    public double getX() {
        return y;
    }

    public double getY() {
        return x;
    }

}
