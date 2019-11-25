import javax.persistence.*;

@Entity
@Table(schema = "lab", name = "dots")
public class Dot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(table = "dots", name = "x")
    private double x;

    @Column(table = "dots", name = "y")
    private double y;

    @Column(table = "dots", name = "r")
    private double r;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public int getId() {
        return id;
    }

    public Dot(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public Dot() {
    }

    public Dot(int id, double x, double y, double r) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
