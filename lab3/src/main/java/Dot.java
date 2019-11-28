import javax.persistence.*;

@Entity
@Table(schema = "public", name = "dots")
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

    @Column(table = "dots", name = "hit")
    private boolean hit;

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

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public Dot(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public Dot(double x, double y, double r, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
    }

    public Dot() {
    }

    public Dot(int id, double x, double y, double r) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
    }

    @Override
    public String toString() {
        return "Dot{" +
                "id=" + id +
                ", x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", hit=" + hit +
                '}';
    }
}
