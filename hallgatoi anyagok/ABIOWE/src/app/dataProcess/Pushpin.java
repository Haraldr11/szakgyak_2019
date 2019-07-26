package app.dataProcess;

public class Pushpin {
    public Pushpin(Coordinate coordinate, String TARS_ROV_NEV, String CIM_EGYBEN) {
        this.coordinate = coordinate;
        this.TARS_ROV_NEV = TARS_ROV_NEV;
        this.CIM_EGYBEN = CIM_EGYBEN;
    }

    public Coordinate coordinate;
    public String TARS_ROV_NEV;
    public String CIM_EGYBEN;
}
