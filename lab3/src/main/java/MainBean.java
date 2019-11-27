import java.util.Arrays;
import java.util.List;

public class MainBean {
    private List<Dot> dotList;
    private List<String> xList = Arrays.asList("-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3");
    private List<String> rList = Arrays.asList("1", "1.5", "2", "2.5", "3"  );

    public MainBean() {
        DotDAOImpl dao = new DotDAOImpl();
        dao.activateComponent();
        dotList = dao.getDots();
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
}
