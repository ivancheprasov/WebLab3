import java.util.List;

public class MainBean {
    private List<Dot> dotList;

     MainBean(){
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
}
