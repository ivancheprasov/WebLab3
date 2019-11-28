import java.io.Serializable;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import static java.lang.Math.pow;

public class MainBean implements Serializable {

    private boolean canvas;
    private String x="";
    private String y="";
    private String r="";
    private double doubleX;
    private double doubleY;
    private double doubleR;
    private List<Dot> dotList;
    private List<String> xList = Arrays.asList("-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3");
    private List<String> rList =  Arrays.asList("1", "1.5", "2", "2.5", "3");

    public MainBean() {
        DotDAOImpl dao = new DotDAOImpl();
        dao.activateComponent();
        if(dao.getDots().size()>5) {
            dotList = dao.getDots().subList(0, 4);
        } else {
            dotList = dao.getDots();
        }
        dao.deactivateComponent();
    }

    public List<Dot> getDotList() {
        return dotList;
    }

    public void setDotList(List<Dot> dotList) {
        this.dotList = dotList;
    }

    public List<String> getxList() {
        return xList;
    }

    public void setxList(List<String> xList) {
        this.xList = xList;
    }

    public List<String> getrList() {
        return rList;
    }

    public void setrList(List<String> rList) {
        this.rList = rList;
    }

    public void addDot(boolean canvas){
        System.out.println(canvas);
        this.canvas = canvas;
        if(isDotValid()) {
            Dot dot = new Dot(doubleX,doubleY,doubleR);
            dot.setHit(isHit());
            while(dotList.size() >= 5){
                dotList.remove(0);
            }
            dotList.add(dot);
        }
    }

    public boolean isDotValid(){
        if(isValidDouble(x) && isValidDouble(y.replace(",", "."))  && isValidDouble(r)) {
            doubleX = Double.parseDouble(x);
            doubleY = Double.parseDouble(y.replace(",", "."));
            doubleR = Double.parseDouble(r);
            if ((((doubleY > 3) || (doubleY < -5)) && !canvas) || (canvas && ((doubleY > 10) || (doubleY < -10)))
                    || (((doubleX > 3) || (doubleX < -5)) && !canvas) || (canvas && ((doubleX > 10) || (doubleX < -10)))
                    || (((doubleR > 3) || (doubleR < 1)))){
                return false;
            }else{
                return (y.replace(",", ".").matches("^(3|-5|10|-10)(.0+)?$")) || (doubleY != 3 && doubleY != -5 && doubleY != 10 && doubleY != -10);
            }
        } else {
            return false;
        }
    }

    public boolean isHit(){
        return (doubleX <=0 && doubleY>=0 && pow(doubleX,2)+pow(doubleY,2) < pow(doubleR,2))
                ||(doubleX >=0 && doubleY>=0 && doubleY<=doubleR && doubleX<=doubleR/2)
                ||(doubleX <=0 && doubleY<=0 && doubleY>=-doubleX-doubleR);
    }

    private boolean isValidDouble(String str){
        try{
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException | NullPointerException e){
            return false;
        }
    }

    public boolean isCanvas() {
        return canvas;
    }

    public void setCanvas(boolean canvas) {
        this.canvas = canvas;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }

    public double getDoubleX() {
        return doubleX;
    }

    public void setDoubleX(double doubleX) {
        this.doubleX = doubleX;
    }

    public double getDoubleY() {
        return doubleY;
    }

    public void setDoubleY(double doubleY) {
        this.doubleY = doubleY;
    }

    public double getDoubleR() {
        return doubleR;
    }

    public void setDoubleR(double doubleR) {
        this.doubleR = doubleR;
    }
}
