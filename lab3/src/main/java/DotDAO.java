import java.util.List;
import java.util.Optional;

public interface DotDAO {
    List<Dot> getDots();
    Dot getDotById(int id);
    void addDot(Dot dot);
    void addDots(List<Dot> dotList);
    void deleteDotById(int id);
}
