package it.exam.backoffice.board.controller;

import it.exam.backoffice.board.entity.NoticeEntity;
import it.exam.backoffice.board.service.NoticeService;
import it.exam.backoffice.common.dto.PageVO; // Import PageVO
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page; // Import Page
import org.springframework.data.domain.PageRequest; // Import PageRequest
import org.springframework.data.domain.Pageable; // Import Pageable
import org.springframework.data.domain.Sort; // Import Sort
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam; // Import RequestParam
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.util.NoSuchElementException;

@Controller
@RequestMapping("/board")
@RequiredArgsConstructor
public class NoticeViewController {

    private final NoticeService noticeService;

    @GetMapping("/list")
    public ModelAndView noticeList(@RequestParam(value = "page", defaultValue = "0") int page) {
        ModelAndView view = new ModelAndView("views/board/boardList");
        Pageable pageable = PageRequest.of(page, 10, Sort.by("brdId").descending()); // Default size 10
        Page<NoticeEntity> notices = noticeService.getAllNotices(pageable);
        view.addObject("pageVO", notices); // Change to pageVO to match template
        return view;
    }

    @GetMapping("/{brdId}")
    public ModelAndView noticeDetail(@PathVariable("brdId") Integer brdId, RedirectAttributes redirectAttributes) {
        ModelAndView view = new ModelAndView();
        try {
            NoticeEntity notice = noticeService.getNoticeById(brdId);
            view.addObject("vo", notice);
            view.setViewName("views/board/boardDetail");
        } catch (NoSuchElementException e) {
            redirectAttributes.addFlashAttribute("errorMessage", "해당 게시글을 찾을 수 없습니다.");
            view.setViewName("redirect:/board/list");
        }
        return view;
    }

    @GetMapping("/add/form")
    public ModelAndView writeForm() {
        ModelAndView view = new ModelAndView("views/board/writeForm");
        return view;
    }

    @GetMapping("/update/{brdId}")
    public ModelAndView updateForm(@PathVariable("brdId") Integer brdId, RedirectAttributes redirectAttributes) {
        ModelAndView view = new ModelAndView();
        try {
            NoticeEntity notice = noticeService.getNoticeById(brdId);
            view.addObject("vo", notice);
            view.setViewName("views/board/updateForm");
        } catch (NoSuchElementException e) {
            redirectAttributes.addFlashAttribute("errorMessage", "해당 게시글을 찾을 수 없습니다.");
            view.setViewName("redirect:/board/list");
        }
        return view;
    }
}